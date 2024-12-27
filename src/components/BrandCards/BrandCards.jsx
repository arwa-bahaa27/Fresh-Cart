

export default function BrandCards({brandsInfo}) {

    const {id , name , slug , image} = brandsInfo;
  return<>
    
    <div className="brand-card border-2 border-gray-300 p-4  overflow-hidden hover:shadow-md hover:shadow-primary-600 transition:shadow duration-300 mb-2">

        

       <div>
        <img 
        src={image}
        alt=""/>
       </div>

       <div>
        <p className="text-center">{name}</p>
       </div>

    </div>

  </>
}

