const Properties = require("../models/Properties.models.");
const axios = require("axios");
const { faker } = require('@faker-js/faker');

// const options = {
//   method: "GET",
//   url: "https://realtor16.p.rapidapi.com/forsale",
//   params: {
//     location: "santa monica",
//     type: "single_family,condos",
//   },
//   headers: {
//     "X-RapidAPI-Key": "af11d4ca37mshef0ef8628c328cap14ec1ejsn38ceccdb80c4",
//     "X-RapidAPI-Host": "realtor16.p.rapidapi.com",
//   },
// };

const propertiesForSale = async () => {
  try {
    // const response = await axios.request(options);
    // const results = response.data.home_search.results;
    const properties = [];
    for (let i = 1; i <= 50; i++) {
      const property = {
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        descriptionData:{baths:Math.floor(Math.random() * 6),beds:Math.floor(Math.random() * 3),garage:faker.datatype.boolean()},
        category: ["departamento", "PH", "casa", "terreno", "local"][Math.floor(Math.random() * 5)],
        status: true, // Valor predeterminado: true
        statusType:['for_sale','for_rent'][Math.floor(Math.random()*2)],
        price: faker.commerce.price(),
        imgURL: [faker.image.url()],
        neighborhood: faker.location.state(),
        city: faker.location.city(),
        country: faker.location.country(),
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

module.exports=fillProperties