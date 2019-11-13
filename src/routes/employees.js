const express = require('express');
const router = express.Router();

const pool = require('../database')

router.get('/add',(req,res) =>{
    res.render('employees/add');
});


router.post('/add',async (req,res) =>{
    const {nombreUsuario,nombres,apellidos,curp,fechaNacimiento,direccion,telefono,correoElectronico,departamento,fechaInicio} = req.body;
    const newEmployee = {
        nombreUsuario,
        nombres,
        apellidos,
        curp,
        fechaNacimiento,
        direccion,
        telefono,
        correoElectronico,
        departamento,
        fechaInicio
    }

    try{
        await pool.query('INSERT INTO Empleados set ?',[newEmployee]);

        res.redirect('/employees');


    }catch(err){
        console.log(err)
    }
   

});

router.get('/',async(req,res) =>{
    try{
        const employees = await pool.query('SELECT * FROM Empleados');
        res.render('employees/list', {employees});

    }catch(err){
        console.log(err)
    }


});

router.get('/delete/:id', async (req,res) =>{
    try{
        const {id} = req.params;
        console.log('Console Log desde /delete/id')
        console.log(id);
        const result = await pool.query('CALL BORRAR_EMPLEADO(?)',[id]);

        res.redirect('/employees');
    }catch(err){
    }

});

router.get('/edit/:id', async(req,res) =>{

    try{
        const {id} = req.params;
        console.log(id);
        const employees = await pool.query('SELECT * FROM Empleados WHERE idUsuario =?',[id]);
        console.log(employees[0]);
        res.render('employees/edit',{employees:employees[0]});


    }catch(err){
        console.log(err);
    }


});

router.post('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    const {nombres,apellidos,curp,direccion,telefono,departamento} = req.body;
    const updatedUser = {
        
        nombres,
        apellidos,
        curp,
        direccion,
        telefono,
        departamento 
    }

    try{
        console.log(updatedUser);
        console.log(id);
        const query = "CALL ACTUALIZAR_EMPLEADO("+id+",'"+nombres+"','"+apellidos+"','"+curp+"','"+direccion+"','"+telefono+"','"+departamento+"')";
        console.log(query);
        await pool.query(query);

        res.redirect('/employees')
    }catch(err){

    }

});



module.exports = router;