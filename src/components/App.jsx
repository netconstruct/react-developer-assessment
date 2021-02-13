import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import { LoadingSpinner } from './styledComponents/LoadingSpinner';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function App() {
  const [apiData, setApiData] = useState(null);

  // Make the fetch request once the App component has mounted. I would have liked to be able to pass query params to the api,
  // but mirage doesnt seem to accept these. It would have been preferable to return a specified number of records to help performance,
  // and pagination
  useEffect(() => {
    fetch('api/posts').then((results) =>
      setApiData(JSON.parse(results._bodyText))
    );
  }, []);
  // By passing an empty array the useEffect only fires once on mount. Here would could have passed in filter values to only return the data we wanted
  // and cause the useEffect to fire again if the values changed

  console.log({ apiData });

  return apiData ? (
    <Router>
      <AppContainer>
        <Switch>
          <Route exact path="/" render={() => <Home apiData={apiData} />} />
          <Route path="/details" render={() => <Details />} />
        </Switch>
      </AppContainer>
    </Router>
  ) : (
    //If we are waiting for the API to return the data, render a loading spinner
    <AppContainer>
      <LoadingSpinner />
    </AppContainer>
  );
}

export default App;
