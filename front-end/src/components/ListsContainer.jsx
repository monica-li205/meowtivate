import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ActionList from "./ActionList";
import CatPlant from './CatPlant'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Progress from "./Progress";
import UnlockBadge from "./UnlockBadge";
import calculateChecked from "../helpers/calculateChecked";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: '10vw',
    minHeight: '25vh',
    paddingLeft: '5vw',
    paddingRight: '5vw',
  },
  header: {
    fontFamily: "Varela Round",
    letterSpacing: "8px",
  },
  plantbox: {
    position:'static',
    zIndex: 1,
    minWidth: '10vw',
    minHeight: '40vh',
    paddingLeft: '5vw',
    paddingRight: '5vw',
  },
  lists: {
    minWidth: '10vw',
    minHeight: '50vh',
  }

}));

export default function ListContainer(props) {
  const { state, actionFunctions, catFunctions, potFunctions } = props;
  const { actions, todos, habits, unlocked } = state;
  const classes = useStyles();

  // console.log("habits in ListsContainer", habits);

  const completed = actions.filter(obj => obj.is_completed === true);
  const checkedHabits = completed.filter(obj => obj.category_id === 2);
  const checkedTodos = completed.filter(obj => obj.category_id === 1);
  const habitIDs = calculateChecked(checkedHabits);
  const todoIDs = calculateChecked(checkedTodos);

  // console.log("completed", completed)
  // console.log("checkedHabits", checkedHabits);
  // console.log("checkedTodos", checkedTodos);
  
  return (
    <>
    <UnlockBadge state={state} catFunctions={catFunctions} />
    <div className={classes.root}>
      <h2 className={classes.header}>LET'S GET LOTS DONE TODAY</h2>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card className={classes.lists}>
            <CardContent>
              <h3>Daily Habits</h3>
              <ActionList 
                items={habits} 
                category={2} 
                actionFunctions={actionFunctions}
                initChecked={habitIDs} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.lists}>
            <CardContent>
              <h3>To-Do Today</h3>
              <ActionList 
                items={todos} 
                category={1} 
                actionFunctions={actionFunctions}
                initChecked={todoIDs} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              {/* <div>
              </div> */}
              <div className={classes.plantbox}>
                <h3>Today's Progress</h3>
                <CatPlant 
                  actions={actions}
                  potFunctions={potFunctions}
                  state={state} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      <Progress
        todos={todos}
        habits={habits}
        actions={actions}
        />
        </Grid>
    </div>
    </>
  );
}
