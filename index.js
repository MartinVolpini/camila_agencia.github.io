const express = require ("express");
const cors    = require("cors");
const colors  = require("colors");
const nodemailer = require("nodemailer");

const app = express();
app.set('port',  4250)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/email', (req, res)=>{                                                      
 
    let _valor1 = req.body._nombre; let _valor2 = req.body._email; 
    let _valor3 = req.body._message;

    console.log( _valor1.red, _valor2.red, _valor3.red )

    async function main() {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: "cami.volpini@gmail.com", // generated user
            pass: "anbdsywjoglessrd", // generated password
            },
        });
        
        // transporter.verify(()=>{
        //     console.log('Ready for send email'.green)
        // });
        
        // EL OBJ DEL MENSAJE , LOS DATOS QUE QUERES ENVIAR
        let info = await transporter.sendMail({//ES UNA FUNCION ASINCRONA POR ESO EL AWAIT
            from:`Web Page ${_valor2}`, // sender address
            to: "cami.volpini@gmail.com", // list of receivers
            subject: `WEB PAGE Mensaje`, // Subject line
            html: `
            <h1>Mensaje de web page</H1><br>
            <b>NOMBRE: ${_valor1}</b><br><br>
            <b>EMAIL: ${_valor2}</b><br><br>
            <b>MENSAJE:</b><br>
            <b>${_valor3}</b>
            `
            // html body
        });

    }
    main().catch(console.error)
    
})


app.listen( app.get('port'), () => { console.log(`EXPRESS puerto ${app.get('port')}`.yellow) } );