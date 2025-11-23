/**
 * Скрипт для выгрузки товаров из 1С (через OData) и импорта в локальный магазин
 * 
 * Как использовать:
 * 1. Убедитесь, что в 1С опубликована OData (Администрирование -> Публикация на веб-сервере -> поставить галочку "Публиковать стандартный интерфейс OData")
 * 2. Настройте константы подключения ниже (URL, логин, пароль)
 * 3. Запустите скрипт: npx ts-node backend/scripts/sync-1c.ts
 */

import axios from 'axios';

// ================= НАСТРОЙКИ 1С =================
const ONE_C_CONFIG = {
  // URL базы 1С. Обычно: http://<server>/<base>/odata/standard.odata
  baseURL: 'http://192.168.1.10/trade_base/odata/standard.odata',
  username: 'Administrator', // Пользователь 1С
  password: '123',           // Пароль 1С
  
  // Имена справочников в вашей конфигурации (могут отличаться в УТ, УНФ, ERP)
  catalogName: 'Catalog_Номенклатура',
  priceRegisterName: 'InformationRegister_ЦеныНоменклатуры',
};

// ================= НАСТРОЙКИ ЛОКАЛЬНОГО МАГАЗИНА =================
const LOCAL_API_URL = 'http://localhost:5000/api/1c/catalog/import';

async function syncCatalog() {
  console.log('🚀 Начинаем синхронизацию с 1С...');

  const auth = {
    username: ONE_C_CONFIG.username,
    password: ONE_C_CONFIG.password,
  };

  try {
    // 1. Получаем товары из 1С
    console.log(`📥 Скачиваем товары из ${ONE_C_CONFIG.catalogName}...`);
    
    // $format=json - просим JSON
    // $top=100 - для теста берем первые 100, уберите для полной выгрузки
    // $select - выбираем только нужные поля (Ref_Key - это GUID, Description - наименование)
    const productsUrl = `${ONE_C_CONFIG.baseURL}/${ONE_C_CONFIG.catalogName}?$format=json&$top=50&$select=Ref_Key,Description,Code,Article`;
    
    const response = await axios.get(productsUrl, { auth });
    const oneCProducts = response.data.value;

    if (!oneCProducts || oneCProducts.length === 0) {
      console.log('⚠️ Товары в 1С не найдены.');
      return;
    }

    console.log(`✅ Получено ${oneCProducts.length} товаров из 1С.`);

    // 2. Преобразуем данные в наш формат
    // (В реальности тут можно сделать еще запрос к регистру цен, чтобы получить актуальную цену)
    
    const mappedProducts = oneCProducts.map((item: any) => {
      return {
        id: item.Ref_Key,           // Используем GUID 1С как ID
        name: item.Description,      // Наименование
        description: `Артикул: ${item.Article || item.Code}`,
        price: 0,                   // Цену пока ставим 0 (нужен отдельный запрос к регистру цен)
        brand: '1С Import',
        categoryId: 'cat-food',     // Временная категория
        inStock: true,
        stockQuantity: 10,
        petType: 'all'
      };
    });

    // 3. Отправляем на наш локальный сервер
    console.log('📤 Отправляем данные в локальный магазин...');
    
    const importResponse = await axios.post(LOCAL_API_URL, mappedProducts);

    console.log('🎉 Синхронизация завершена!');
    console.log(`Ответ сервера: ${JSON.stringify(importResponse.data, null, 2)}`);

  } catch (error: any) {
    console.error('❌ Ошибка синхронизации:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error.message);
    }
    console.log('\n💡 Совет: Проверьте, опубликован ли OData интерфейс в 1С и корректность логина/пароля.');
  }
}

// Запуск
syncCatalog();


