
import './App.css';
import ProductForm from './components/ProductForm';
import {Switch, Route} from 'react-router-dom';
import OneProduct from './components/OneProduct';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/" >
          <ProductForm />
        </Route>

        <Route exact path = "/product/:_id">
          <OneProduct />
        </Route> 

        <Route exact path = "/product/:_id/edit">
          <Edit />
        </Route> 

      </Switch> 

    </div>
  );
}

export default App;
