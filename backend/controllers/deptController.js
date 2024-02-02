import Department from "../models/deptModel.js"

export const createDept = async (req, res) => {
  
    try {
      const {
        name
      } = req.body;
  
      const deptExist = await Department.findOne({name});
  
      if (deptExist){
        return res.status(400).json({ error: "Department already Exist" });
      }
  
      const newDept = new Department({
        name
      });
      const savedDept = await newDept.save();
      res.status(201).json(savedDept);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  export const addEmployee = async (req, res) => {
    try {
        const { deptId, employeeId } = req.body;
        
        // Find the department
        const department = await Department.findById(deptId);
        
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        
        // Check if employee already exists in the department
        if (department.employees.includes(employeeId)) {
            return res.status(400).json({ error: "Employee already exists in the department" });
        }
        
        // Add employee to department
        department.employees.push(employeeId);
        await department.save();
        
        res.status(201).json({ success: true, message: "Employee added to department successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { id, deptId } = req.body;
        const department = await Department.findById(deptId);

        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }

        // Filter out the employee ID from the employees array
        department.employees = department.employees.filter(employee => employee.toString() !== id);
        await department.save();

        res.status(200).json({ success: true, message: "Employee deleted from department successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const selectedEmployees = async (req, res) => {
    try {
        const { deptId, employeeId } = req.body;
        
        // Find the department
        const department = await Department.findById(deptId);
        
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        
        // Check if employee already exists in the department
        if (department.employees.includes(employeeId)) {
            return res.status(400).json({ error: "Employee already exists in the department" });
        }
        
        // Add employee to department
        department.employees.push(employeeId);
        await department.save();
        
        res.status(201).json({ success: true, message: "Employee added to department successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const allDepts =async(req,res,next)=>{
    try {
        const departments = await Department.find()
     
        res.status(200).json({
            success:true,
            departments
        })
    } catch (error) {
        return next(error)
    }
}
export const singleDept =async(req,res,next)=>{
    try {
        const department = await Department.findById(req.params.id)
        delete department.password;
        res.status(200).json({
            success:true,
            department
        })
        next()
    } catch (error) {
        return next(error)
    }
}
export const editDept =async(req,res,next)=>{
    try {
        const department = await Department.findByIdAndUpdate(req.params.id,req.body,{new:true})
        
        res.status(200).json({
            success:true,
            department
        })
        next()
    } catch (error) {
        return next(error)
    }
}

export const deleteDept =async(req,res,next)=>{
    try {
        const department = await Department.findByIdAndDelete(req.params.id)
        
        res.status(200).json({
            success:true,
            department
        })
        next()
        
    } catch (error) {
        return next(error)
    }
}