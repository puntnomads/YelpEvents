import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import type { $AxiosXHR } from "axios";

type Props = {
  user: any
};

class axiosInterceptor extends Component<Props> {
  toastId = 0;
  componentDidMount() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      axios.defaults.headers.common.Authorization = user.token;
    }
    axios.interceptors.response.use((response: $AxiosXHR<any, any>) => {
      if (response.data && response.data.info) {
        if (!toast.isActive(this.toastId)) {
          this.toastId = toast.info(response.data.info, { autoClose: 5000 });
        }
      }
      if (response.data && response.data.error) {
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
      axios.defaults.headers.common.Authorization = user.token;
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
