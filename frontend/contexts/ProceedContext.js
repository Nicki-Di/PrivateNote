import React from "react";

const ProceedContext = React.createContext({
    proceed: false,
    setProceed: () => {
    }
});

export default ProceedContext