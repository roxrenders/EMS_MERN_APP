import User from "../models/userModel.js"

export const allUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 4;
        const skip = (page - 1) * pageSize;

        const users = await User.find().skip(skip).limit(pageSize);
        
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return next(error);
    }
};
export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };
  
export const singleUser =async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        delete user.password;
        res.status(200).json({
            success:true,
            user
        })
        next()
    } catch (error) {
        return next(error)
    }
    
}
export const editUser =async(req,res,next)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        
        res.status(200).json({
            success:true,
            user
        })
        next()
    } catch (error) {
        return next(error)
    }
}

export const deleteUser =async(req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        
        res.status(200).json({
            success:true,
            user
        })
        next()
    } catch (error) {
        return next(error)
    }
}

export const filterEmployeesByLocation = async (req, res, next) => {
  try {
    const { location } = req.query;
 
    const users = await User.find({ location: { $regex: location, $options: "i" } });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(error);
  }
};
export const sortEmployeesByName = async (req, res, next) => {
    try {
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const employees = await User.find().collation({ locale: 'en' }).sort({ firstName: sortOrder });
        res.status(200).json({
            success: true,
            employees
        });
    } catch (error) {
        return next(error);
    }
};

