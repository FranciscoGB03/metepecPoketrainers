import iconPokeball from './../../../public/img/pokebalLiga.svg'
const EquiposTop = () => {
  /**hooks */
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <h2 className="text-2xl font-semibold leading-tight">
              Equipos Top
            </h2>
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-tr from-blue-600 via-blue-500 to-slate-50  shadow-md rounded-lg overflow-hidden flex justify-center items-center">
                    <img className="w-8 mt-10  mb-10" src={iconPokeball} alt="icon pokeball"/>
                    <h2 className="text-xl  text-white  font-bold ml-2 mt-10 mb-10">Liga Super</h2>
                  </div>
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <h2 className="text-xl font-bold mb-2">Hola</h2>
                  </div>
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <h2 className="text-xl font-bold mb-2">Hola</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EquiposTop;
