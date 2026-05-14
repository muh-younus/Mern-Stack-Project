import productModel from "../model/product.model.js";

/* Create A New Product */
export const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({
      message: "Product create successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error,
    });
  }
};

/* Get All Product */
export const gettAllProduct = async (req, res)=>{

    try{
        const {search, category} = req.query
        

        let filter = {};

        if(search){
            filter.title = {$regex: search, $options: 'i'}
        }

        if(category){
            filter.category = category;
        }

        const product = await productModel.find(filter).sort({createAt: -1})
        res.status(200).json(product)

    }catch(error){

        res.json({
            message: "server error", error
        })

    }
}

/* Update Product */
export const updatedProduct = async (req, res)=>{

    try{
        const updated = await productModel.findByIdAndUpdate(
           req.params.id,
           req.body,
           {new:true} 
        );
        res.json({
            message: "product updated successfully",
            updated
        })

    }catch(err){

        res.status(500).json({
            message: "server error", err
        })

    }
}

/* Delete Product */
export const deleteProduct = async (req, res)=>{

    try{
        await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'product delete successfully'
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",error
        })
    }
}
