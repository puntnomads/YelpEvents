import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

class axiosInterceptor extends Component {
  toastId = null;
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      axios.interceptors.request.use(request => {
        request.headers.Authorization = user.token;
        return request;
      });
    }
    axios.interceptors.response.use(response => {
      if (response.data.info) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.info(response.data.info, { autoClose: 5000 });
        }
      }
      if (response.data.error) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.error(response.data.error, { autoClose: 5000 });
        }
      }
      return response;
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && this.props.user.token !== prevProps.user.token) {
      const user = this.props.user;
      localStorage.setItem("user", JSON.stringify(user));
      axios.interceptors.request.use(request => {
        request.headers.Authorization = user.token;
        return request;
      });
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const connected = connect(mapStateToProps, {})(axiosInterceptor);

export default connected;
