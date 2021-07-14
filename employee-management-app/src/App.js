import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { fetchDataThunk } from "./actions/thunkActions";
import { handlerClicked } from "./actions/sagaActions";
import { handlerCardClicked } from "./actions/sagaActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import MUICard from "@material-ui/core/Card";
import MUICardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Popup from './components/Popup'; 

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  spinnerRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  spinnerEmployee: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh",
  },
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
    backgroundColor: "#3F51B5",
    backgroundImage: "linear-gradient(315deg, #3F51B5 0%, #09203f 74%)",
  },
  card2: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
    backgroundColor: "#10274f",
    
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
    backgroundColor: "#F50057",
    color: "#3F51B5",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
    color: "#F50057",
  },
  subheader: {
    fontSize: 18,
    color: "#c7c7c7",
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 14,
    color: "#c7c7c7",
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
    color: "#F50057",
  },
});

class App extends Component {
  constructor(props){  
    super(props);  
    this.state = { showPopup: false };  
    }  
    togglePopup() {  
      this.setState({  
           showPopup: !this.state.showPopup  
      });  
       }  
  handleFetchEmployeeByThunk = () => {
    this.props.startFetchByThunk();
  };

  handleFetchEmployeeBySaga = () => {
    this.props.startFetchBySaga();
    console.log("saga1");
  };

  handleFetchSpecificEmployee = (id) => {
    this.props.startFetchEmployee(id);
    console.log("saga2");
    this.togglePopup();
  };
  LoadingSpinner = ({ classes }) => (
    <div className={classes.spinnerRoot}>
      <CircularProgress color="secondary" />
    </div>
  );
  LoadingEmpSpinner = ({ classes }) => (
    <div className={classes.spinnerEmployee}>
      <CircularProgress color="secondary" />
    </div>
  );
Popup = (
  {
    classes,
    id,
    employee_name,
    employee_salary,
    employee_age,
    profile_image,
  }
) => (
  <div className='popup'>  
<div> 

 
{this.props.status === "loadingEmployee" ? (
           <div> <this.LoadingEmpSpinner classes={this.props.classes}></this.LoadingEmpSpinner>
            <button onClick={this.togglePopup.bind(this)} style={{float:"right",}}>close me</button> </div>
          ) : (
            <div className={classes.card2}>
          <div >
        <Avatar className={classes.avatar} src={profile_image}></Avatar>
        <h3 className={classes.heading}>{employee_name}</h3>
        <span className={classes.subheader}># {id}</span>
        </div>
      <Divider light />
      <Box display={"flex"}>
        <Box p={2} flex={"auto"}>
          <p className={classes.statLabel}>Age</p>
          <p className={classes.statValue}>{employee_age}</p>
        </Box>
        <Box p={2} flex={"auto"}>
          <p className={classes.statLabel}>Salary</p>
          <p className={classes.statValue}>${employee_salary}</p>
        </Box>
      </Box>
      <button onClick={this.togglePopup.bind(this)} style={{float:"right"}}>close me</button>

</div>


          )}
          
</div>  
</div> 
);
  EmployeeCard = ({
    classes,
    id,
    employee_name,
    employee_salary,
    employee_age,
    profile_image,
  }) => (
    <MUICard className={classes.card}>
      <MUICardContent  onClick={() => this.handleFetchSpecificEmployee(id)}>
        <Avatar className={classes.avatar} src={profile_image}></Avatar>
        <h3 className={classes.heading}>{employee_name}</h3>
        <span className={classes.subheader}># {id}</span>
      </MUICardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box p={2} flex={"auto"}>
          <p className={classes.statLabel}>Age</p>
          <p className={classes.statValue}>{employee_age}</p>
        </Box>
        <Box p={2} flex={"auto"}>
          <p className={classes.statLabel}>Salary</p>
          <p className={classes.statValue}>${employee_salary}</p>
        </Box>
      </Box>
    </MUICard>
  );
  render() {
    const { status, classes } = this.props;
    const { employees } = this.props;
    const { emp } =this.props;
    console.log("emp",emp)
    return (
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Employee Management
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleFetchEmployeeBySaga}
              >
                Fetch Employees
              </Button>
            </Toolbar>
          </AppBar>
          {status === "loading" ? (
            <this.LoadingSpinner classes={classes}></this.LoadingSpinner>
          ) : (
            ""
          )}
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            {employees.map((employee, i) => (
              <Grid item xs={12} sm={12} md={4} lg={3} key={i}>
                <this.EmployeeCard classes={classes} {...employee} />
                {this.state.showPopup ?  
<this.Popup classes={classes} {...emp.data}/>  
: null  
}  
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.employeeReducer.status,
  employees: state.employeeReducer.data,
  emp: state.employeeReducer.emp,
});

const mapDispatchToProps = (dispatch) => ({
  startFetchByThunk: () => dispatch(fetchDataThunk()),
  startFetchBySaga: () => dispatch(handlerClicked()),
  startFetchEmployee: (id) => dispatch(handlerCardClicked(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(App));
