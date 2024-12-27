

export default function CategoriesCards( {categoriesInfo} ) {

    const {id , name , image} = categoriesInfo;
  return <>

<div className="category-card  rounded-md   border-2 border-gray-300  overflow-hidden hover:shadow-md hover:shadow-primary-600 transition:shadow duration-300 mb-2">

        

<div className="pb-4">
 <img 
 src={image}
 alt=""
  className="w-full h-48 object-cover"
 />
</div>

<div className="pb-4">
 <p className="text-center font-semibold text-primary-950 text-2xl">{name}</p>
</div>

</div>


  </>
}
