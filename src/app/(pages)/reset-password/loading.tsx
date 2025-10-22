import classes from './loading.module.scss'

const Loading = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.loadingText}>
        <span className={classes.loadingTextWords}>L</span>
        <span className={classes.loadingTextWords}>O</span>
        <span className={classes.loadingTextWords}>A</span>
        <span className={classes.loadingTextWords}>D</span>
        <span className={classes.loadingTextWords}>I</span>
        <span className={classes.loadingTextWords}>N</span>
        <span className={classes.loadingTextWords}>G</span>
      </div>
    </div>
  )
}

export default Loading
