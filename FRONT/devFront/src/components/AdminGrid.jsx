import React, { Fragment } from "react";
import "../styles/grid.css";
import { useSelector } from "react-redux";
import "../styles/properties.css";
import { Link } from "react-router-dom";
import computer from "../../public/assets/computer.png";
import axios from "axios";
const AdminGrid = ({fetchData}) => {
  const data = useSelector((state) => state.adminData);
  const optionData = useSelector((state) => state.option);


  const deleteProperty=async(id)=>{
    try {
      const confirmed=window.confirm('¿Deseas eliminar la propiedad?')
      if(confirmed){
        await axios.delete(`http://localhost:3000/api/properties/${id}`,{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        })
        fetchData()
      }
    } catch (error) {
      console.log('ocurrio un error al eliminar la propiedad',error);
    }
  }


  return (
    <div className="w-screen h-screen ">
      <h1 className="text-black text-3xl font-bold mt-10 ml-5 ">
        {optionData === "Propiedades"
          ? `Nuestras propiedades`
          : `Nuestros usuarios`}
      </h1>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 p-0">
      <div className="w-72 rounded-xl  bg-gradient-to-t from-red-500 ">
        <Link to={'/home/admin/addProperty'}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001M12 12.0001V16.0001M14 14.0001H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg></Link>
      </div>
        {data.map((dataObject, index) => (
          <Fragment key={index}>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl shadow-red-700">
              <img
                src={dataObject.imgURL ? dataObject.imgURL[0] : computer}
                alt="Property"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-blue-400 mr-3 uppercase text-xs">
                  {dataObject.type === "property"
                    ? `ID propiedad: ${dataObject.id}`
                    : `ID usuario: ${dataObject.id}`}
                </span>
                <p className="text-lg font-bold text-blue-600 truncate block capitalize">
                  {dataObject.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-blue-700 cursor-auto my-3">
                    {dataObject.type === "property"
                      ? `USD${dataObject.price}`
                      : `Email: ${dataObject.email}`}
                  </p>
                  <div className="flex ml-10">
                    {dataObject.type==='property'?(<><button onClick={()=>deleteProperty(dataObject.id)} className="border border-gray-800">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    
                    <button className="border border-gray-800 ml-2">
                      <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        id="update-alt"
                        data-name="Flat Line"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon flat-line"
                      >
                        <path
                          id="primary"
                          d="M5.07,8A8,8,0,0,1,20,12"
                          style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                          }}
                        ></path>
                        <path
                          id="primary-2"
                          data-name="primary"
                          d="M18.93,16A8,8,0,0,1,4,12"
                          style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                          }}
                        ></path>
                        <polyline
                          id="primary-3"
                          data-name="primary"
                          points="5 3 5 8 10 8"
                          style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                          }}
                        ></polyline>
                        <polyline
                          id="primary-4"
                          data-name="primary"
                          points="19 21 19 16 14 16"
                          style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                          }}
                        ></polyline>
                      </svg>
                    </button>
                    </>
                    ):(<button>hola</button>)}
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </section>{" "}
    </div>
  );
};

export default AdminGrid;
