import { useFormik } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Switch } from '@material-ui/core';
import { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import { API } from "../../API";
import { useHistory } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles({
    root:{
        margin:"10px"
    },
    mainForm:{
        margin:"20px",
        display:"flex",
        flexFlow:"column"
    }
});

const EditForm = (props)=>{
    const [editable, setEditable] = useState(props.item==undefined);
    const mode = props.item?"edit":"add";
    const [date, setDate] = useState((mode=="edit"?props.item.itemBatteryLastChecked:null));
    const classes = useStyles();
    const history = useHistory();
    const formik = useFormik({
        initialValues:{
            itemName:(mode=="edit"?props.item.itemName:""),
            itemNotes:(mode=="edit"?props.item.itemNotes:""),
            itemBattery:(mode=="edit"?props.item.itemBattery:false),
            itemBatteryLastChecked:(mode=="edit"?props.item.itemBatteryLastChecked:false)
        },
        //validationSchema:null, //-> aca va Yup
        onSubmit : (values)=>{
            switch(mode){
                case "edit":
                    API.post("/edit",{...values,id:props.item.id}).then((response)=>{
                        console.log("saved to api:");
                        console.log(response);
                    });
                    setEditable(false);
                    break;
                case "add":
                    console.log("trying to add")
                    API.post("/add",{...values}).then((response)=>{
                        console.log("saved to api:");
                        console.log(response);
                    });
                    history.push("/tareasList");
                    break;
            }
            
        }
    })
    const handleDateChange = (data,data2)=>{
        console.log("mui date",data,data2);
        //formik.values.itemBatteryLastChecked = data2;
        formik.setValues({...formik.values,itemBatteryLastChecked:data2});
        setDate(data2);
    }


return (
    <Paper elevation={3}>
        <h1>
            { mode=="edit"   && (!editable?"Ver":"Editar")+' artículo '+props.item.id }
            { mode=="add"    && "Nuevo artículo" }
            {!editable && <EditIcon size="big" onClick={()=>setEditable(true)} color="primary">Editar</EditIcon>}
        </h1>
        <form className={classes.mainForm} onSubmit={formik.handleSubmit}>
        <TextField 
            InputProps={{readOnly:!editable}}
            id="itemName"
            label="nombre"
            itemName="itemName"
            placeholder="Ingrese un nombre"
            value={formik.values.itemName}
            onChange={formik.handleChange}
        />
        <TextField 
            InputProps={{readOnly:!editable}}
            id="itemNotes"
            label="Notas"
            itemNotes="itemNotes"
            placeholder="Ingrese notas"
            value={formik.values.itemNotes}
            onChange={formik.handleChange}
        />
        <label>Batería:</label>
        <Switch
            checked={formik.values.itemBattery}
            name="itemBattery"
            onChange={formik.handleChange}
            disabled={!editable}
        />
        {formik.values.itemBattery && <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Batería última vez revisada:"
                format="MM/dd/yyyy"
                value={date}
                onChange={handleDateChange}
                InputProps={{readOnly:!editable}}
                KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>}
        {
            editable && <Button type="submit" color="primary" variant="contained">{mode=="edit"?"Guardar Cambios":"Añadir Item"}</Button>
        }
        </form>
    </Paper>
)

}

export default EditForm;
