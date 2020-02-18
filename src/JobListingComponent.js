import React from "react";

const Component = ({ comp }) => {
    switch (comp.typeId) {
      case 0:
      case 4:
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: comp.text }} />
            <h1>{comp.heading}</h1>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>{comp.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: comp.column1 }} />
            <div dangerouslySetInnerHTML={{ __html: comp.column2 }} />
          </div>
        );
      default:
        return null;
    }
  };

  export default Component;