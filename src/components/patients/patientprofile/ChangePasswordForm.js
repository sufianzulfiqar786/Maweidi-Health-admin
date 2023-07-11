import { Checkbox } from "antd";
import "../../../assets/css/patients/patientprofile/changepasswordform.scss";



  
const ChangePasswordForm = () => {
  return (
    <div className="change-password-wrapper">
      <div className="title">Change Password</div>

      {/* Change password form */}
      <form className="change-password-form">
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Old Password:</label>
            <input type="text" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">New Password:</label>
            <input type="text" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6">
            <label for="age-input">Re-typed Password</label>
            <input type="text" />
          </div>
        </div>

        <button type="button" className="add-patient">
          Save Password
        </button>
      </form>

      {/* Notification Settings */}
      <div class="account-notifications-wrapper">
        <div class="heading">Account Notifications</div>
        <div class="notification-setting">
          <div class="first-row">
            <div class="notification-group">
              <div class="notification-description">
                When someone accept an appointment request
              </div>
            </div>
            <div class="notification-group">
              <div class="notification-group">
                <Checkbox />
              </div>
            </div>
          </div>
          <div class="second-row">
            <div class="notification-group">
              <div class="notification-description">
                When someone cancel an appointment request{" "}
              </div>
            </div>
            <div class="notification-group">
              <div class="notification-group">
                {" "}
                <Checkbox />
              </div>
            </div>
          </div>
          <div class="third-row">
            <div class="notification-group">
              <div class="notification-description">
                When I paid any appointment{" "}
              </div>
            </div>
            <div class="notification-group">
              <div class="notification-description">
                {" "}
                <Checkbox />
              </div>
            </div>
          </div>
        </div>

        <div className="delete-heading">Delete Notifications</div>
        <div className="delete-consent">
          Do you want to delete the account? Please press below “Delete” button
        </div>
        <button>Delete Account</button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
