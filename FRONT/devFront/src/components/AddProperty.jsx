import React, { useState } from 'react';

const AddProperty = () => {
  const [hasGarage, setHasGarage] = useState(false);

  // Función para manejar el cambio de estado del checkbox de Garage
  const handleGarageCheckboxChange = (event) => {
    setHasGarage(event.target.checked);
  };
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <input type="text" name="name" id="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   pattern="^[^\d]+$"  required/>
              </div>
            </div>

            
   


        

            <div className="sm:col-span-4">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900" >Description</label>
              <div className="mt-2">
                <textarea required name="description" id="description" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Pais</label>
              <div className="mt-2">
                <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>Argentina</option>
                  <option>Chile</option>
                  <option>Brasil</option>
                  <option>Estados Unidos</option>
                </select>
              </div>
            </div>
    
            <div className="sm:col-span-3">
              <label htmlFor="neighborhood" className="block text-sm font-medium leading-6 text-gray-900">Neighborhood</label>
              <div className="mt-2">
                <input required type="text" name="neighborhood" id="neighborhood" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
           

      
            <div className="sm:col-span-3">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div className="mt-2">
                <input required type="text" name="city" id="city" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
              <div  className="mt-2">
                <input required type="number" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onInput={(event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
      }}/>
              </div>
            </div>

            <div className="sm:col-span-3 flex items-center">
        <label htmlFor="descriptionData.garage" className="block text-sm font-medium leading-6 text-gray-900">Garage</label>
        <div className="mt-2">
          <input
          
            type="checkbox"
            name="descriptionData.garage"
            id="garage"
            checked={hasGarage}
            onChange={handleGarageCheckboxChange}
            className="w-4 h-5 ml-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
      </div>
            <div className="sm:col-span-3">
        <label htmlFor="descriptionData.baths" className="block text-sm font-medium leading-6 text-gray-900">Baths</label>
        <div className="mt-2">
          <input required type="number" name="descriptionData.baths" id="baths" min="0" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  onInput={(event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
      }}/>
        </div>
      </div>

      <div className="sm:col-span-3">
        <label   htmlFor="descriptionData.beds" className="block text-sm font-medium leading-6 text-gray-900">Beds</label>
        <div className="mt-2">
          <input required type="number" name="descriptionData.beds" id="beds" min="0" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  onInput={(event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
      }} />
        </div>
      </div>
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
              <div className="mt-2">
                <input required type="text" name="category" id="category" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
        


            <div className="sm:col-span-3">
              <label htmlFor="statusType" className="block text-sm font-medium leading-6 text-gray-900">Status Type</label>
              <div className="mt-2">
                <input required type="text" name="statusType" id="statusType" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          

            <div className="sm:col-span-4">
              <label htmlFor="imgURL" className="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
              <div className="mt-2">
                <input type="text" name="imgURL" id="imgURL" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

        
           

          </div>
        </div>
        </div>

<div className="mt-6 flex items-center justify-end gap-x-6 mr-10">
  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
</div>
</form>
);
}

export default AddProperty;

