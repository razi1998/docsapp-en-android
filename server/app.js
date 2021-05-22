
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');
const dbrl = "mongodb+srv://admin:admin@cluster0.zvzgs.mongodb.net/myDatabase?retryWrites=true&w=majority";


const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json());
app.use(cors())
mongoose.connect(dbrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected")
}).catch(() => {
    console.log("not connected")
})

const DoctorSchema = mongoose.Schema({
    name: "",
    specialization: "",
    regno: "",
    degree: "",
    email: "",
    password: "",
    mob: ""
},
    {
        timestamps: true
    })
const PatientSchema = mongoose.Schema({
    name: "",
    dob: "",
    patientno: "",
    disease: "",
    detail: [],
    regno: "",
    age: "",
    gender:"",
    email: "",
    passcode: "",
},
    {
        timestamps: true
    })
const Doctor = mongoose.model("doctor", DoctorSchema);
const Patient = mongoose.model("patient", PatientSchema);


app.post("/doctor", (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        specialization: req.body.specialization,
        regno: req.body.regno,
        degree: req.body.degree,
        mob: req.body.mob,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password
    })
    console.log(doctor);
    doctor.save().then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "unable to send"
        })
    })
})
app.post("/patient", (req, res) => {
    const patient = new Patient({
        name: req.body.name,
        dob: req.body.dob,
        patientno: req.body.patientno,
        disease: req.body.disease,
        detail: req.body.detail,
        regno: req.body.regno,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        passcode: req.body.passcode,
    })
    // console.log(patient);
    patient.save().then(data => {

        var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secureConnection: false,
            port: 587,
            auth: {
                user: "coolrazi1998@gmail.com",// your actual email
                pass: "razi1998!"        // your actual password
            }
        });

        var mailOptions = {
            from: "coolrazi1998@gmail.com",
            to: req.body.email,
            bcc: "", // bcc is optional.
            subject:`Greetings, you are now registered as Patient`,
            text: `Hello ${req.body.name} please use this credentials to log in ,
            Your login credentials: 
                    Email: ${req.body.email}
                    Default passcode:${req.body.passcode} 
                    Registration No: ${req.body.regno}

                    
            This is  an automatically generated email - please do not reply to it. 
            If you have any queries please contact our helpdesk`
        }
        //console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.send("error");
            } else {
                //console.log("Message sent: " + response.message);
                res.send("sent");
                console.log("email is sent")
            }
        });
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "unable to add patient"
        })
    })
})
app.get("/patient", (req, res) => {
    Patient.find().then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "unable to get data"
        })
    })
})
app.get("/patient/:patientno", (req, res) => {

    Patient.findOne({ patientno: req.params.patientno }
    ).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "unable to get data"
        })
    })
})

app.post("/patient/:patientno", (req, res) => {
console.log("Checking..",req.body.name,req.body.dob,req.body.patientno,req.body.disease,req.body.detail,req.body.regno,req.body.age,req.body.gender,req.body.email,req.body.passcode)
    Patient.findOneAndUpdate({ patientno: req.params.patientno }, {
        name: req.body.name,
        dob: req.body.dob,
        patientno: req.body.patientno,
        disease: req.body.disease,
        detail: req.body.detail,
        regno: req.body.regno,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        passcode: req.body.passcode
    }, { new: true }).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "unable to get data"
        })
    })
})
app.get("/doctor/:id", (req, res) => {
    console.log("gettin======", req.params.id)
    Doctor.findOne({ regno: req.params.id }).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "err"
        })
    })
})
app.post("/doctor/:id", (req, res) => {
    console.log("posting=====", req.params.id)
    Doctor.findOneAndUpdate({ regno: req.params.id }, {
        regno: req.body.regno,
        email: req.body.email,
        password: req.body.password,
    }, { new: true }).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "err"
        })
    })
})
app.get("/doctor/:id", (req, res) => {
    console.log("regno is coming", req.params.regno)
    Doctor.findOne({ regno: req.params.id }).then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "error"
        })
    })
})
app.get("/doctor", (req, res) => {
    Doctor.find().then(data => {
        res.send(data)
    }).catch((err) => {
        res.send({
            message: "unable to get"
        })
    })
})

app.delete("/patient/:id",(req,res)=>{
    console.log("deleting",req.params.id)
    Patient.findOneAndRemove({patientno:req.params.id}).then(patient=>{
        patient.find().then(data=>{
            res.send(data)
        }).catch((err)=>{
            res.send({
                message:"unable to delete"
            })
        })
    }).catch((err)=>{
        res.send({
            message:"unable to delete"
        })
    })
})
app.listen(4000, () => {
    console.log("4000 is running")
})
