const Properties = require("../models/Properties.models.");
const axios = require("axios");
const { faker } = require('@faker-js/faker');

const propertiesForSale = async () => {
  try {
   
    const properties = [];
    for (let i = 1; i <= 50; i++) {
      const property = {
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        descriptionData:{baths:Math.floor(Math.random() * 6),beds:Math.floor(Math.random() * 3),garage:faker.datatype.boolean()},
        category: ["departamento", "PH", "casa", "terreno", "local"][Math.floor(Math.random() * 5)],
        status: true, 
        statusType:['for_sale','for_rent'][Math.floor(Math.random()*2)],
        price: faker.commerce.price(),
        imgURL: [faker.image.url()],
        neighborhood: faker.location.state(),
        city: faker.location.city(),
        country: faker.location.country(),
        availableDates:{}
      };
      properties.push(property);
    }
    return properties;
  } catch (error) {
    console.error(error);
  }
};

const fillProperties=async()=>{
    try{
        const propertyData = await propertiesForSale();
        await Properties.bulkCreate(propertyData)
        console.log('Se crearon las propiedades correctamente.');

    }
    catch(error){
console.log('error al crear datos falsos',error);
    }
}

if (require.main === module) {
  fillProperties();
}
