function Form({ name, submitButton, linkBlock, children }) {
  return (
    <form className={`form form_type_${name}`}>
      <div className="form__container">{children}</div>
      <div className="form__button-container">
        {submitButton}
        {linkBlock}
      </div>
    </form>
  );
}

export default Form;
