import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CategoryScreen from "./screens/CategoryScreen";
import CoinScreen from "./screens/CoinScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NewsScreen from "./screens/NewsScreen";
import PredictionOutScreen from "./screens/PredictionOutScreen";
import PredictionScreen from "./screens/PredictionScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import WatchListScreen from "./screens/WatchListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          {/* <Route path="/news" component={NewsScreen} /> */}
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/category" component={CategoryScreen} />
          <Route path="/predict" component={PredictionScreen} />
          <Route path="/watchlist" component={WatchListScreen} />
          <Route path="/prediction" component={PredictionOutScreen} />
          <Route path="/crypto/:id" component={CoinScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
