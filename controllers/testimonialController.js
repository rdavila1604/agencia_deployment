import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
    // console.log(req.body);

    //Validar

    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        // console.log('En nombre esta vacio');
        errores.push({mensaje : 'El nombre esta vacio' });
    }

    if(correo.trim() === '') {
        // console.log('En Correo esta vacio');
        errores.push({mensaje : 'El Correo esta vacio' });
    }

    if(mensaje.trim() === '') {
        // console.log('En Mensaje esta vacio');
        errores.push({mensaje : 'El Mensaje esta vacio' });
    }

                // console.log(errores);

    if (errores.length> 0) {

        //Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        //Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
            
        } catch (error) {
            console.log(error);
        }
    }            

}

export { 
    guardarTestimonial
}