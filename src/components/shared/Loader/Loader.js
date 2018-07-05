import React from 'react';
import classes from './Loader.scss';

const Loader = () => {
  return (
    <div id={classes.fountainGId}>
      <div id={classes.fountainG_1} className={classes.fountainG} />
      <div id={classes.fountainG_2} className={classes.fountainG} />
      <div id={classes.fountainG_3} className={classes.fountainG} />
      <div id={classes.fountainG_4} className={classes.fountainG} />
      <div id={classes.fountainG_5} className={classes.fountainG} />
      <div id={classes.fountainG_6} className={classes.fountainG} />
      <div id={classes.fountainG_7} className={classes.fountainG} />
      <div id={classes.fountainG_8} className={classes.fountainG} />
    </div>
  );
};

export default Loader;
