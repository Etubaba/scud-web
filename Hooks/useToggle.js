import React from "react";

function useToggle(initialState = false) {
  const [check, setCheck] = React.useState(initialState);
  const checked = React.useCallback(() => setCheck(true), []);
  const unchecked = React.useCallback(() => setCheck(false), []);
  const toggle = React.useCallback((id) => setCheck((check) => !check), []);

  

  return {
    check,
    checked,
    unchecked,
    toggle
  };
}

export default useToggle;
