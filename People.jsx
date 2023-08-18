import { React, useState, useEffect, useCallback } from "react";
import * as peopleService from "../services/peopleService";
import NewPeople from "./people/NewPeople";

function People() {
  const [pageData, setPageData] = useState({
    arrayOfPeople: [],
    peopleComponents: [],
  });
  const [count, setCount] = useState(0);

  const onClick = useCallback((myperson, eObj) => {
    console.log(myperson.Id.value, eObj, { myperson, eObj });
  }, []);

  const mapPeople = (aPerson) => {
    console.log("mapping", aPerson);

    return (
      <NewPeople
        person={aPerson}
        key={"ListA-" + aPerson.id.value}
        onPersonClicked={onClick}
      />
    );
  };

  useEffect(() => {
    console.log("firing useEffect for people");
    peopleService
      .getPeople(0, 5)
      .then(onGetPeopleSuccess)
      .catch(onGetPeopleError);
  }, []);

  const onGetPeopleSuccess = (data) => {
    console.log(data);
    let arrayOfPeeps = data.items;
    // console.log(arrayOfPeeps);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfPeople = arrayOfPeeps;
      pd.peopleComponents = arrayOfPeeps.map(mapPeople);
      return pd;
    });
  };

  const onGetPeopleError = (err) => {
    console.error(err);
  };

  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <div className="container">
      <h3 onClick={onHeaderClicked}>Rendering{count}</h3>
      <div key="row">{pageData.arrayOfPeople.map(mapPeople)}</div>
    </div>
  );
}
export default People;
