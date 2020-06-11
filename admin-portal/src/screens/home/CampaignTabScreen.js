import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MenuHeaderComponent from "../../navigation/MenuHeaderComponent";
import colors, { material } from "../../util/colors";
import firebase from "firebase";
import { CheckBox, Icon } from "react-native-elements";
import Button from "../../components/Button";
import { TextInput } from "react-native-gesture-handler";

class CampaignTabScreen extends React.Component {
  state = {
    doctors: [],
    salesReps: [],
    refreshing: false,
    repCheck: "",
    campaignCheck: -1,
    enabled: true,
  };

  /**
   * Get all doctors
   *
   * @memberof CampaignTabScreen
   */
  refreshDoctors = () => {
    this.setState({ refreshing: true });
    firebase
      .functions()
      .httpsCallable("getAll")({
        collection: "doctors",
      })
      .then((response) => {
        this.setState({ doctors: response.data.data });
        this.setState({ refreshing: false });
      })
      .catch((response) => {
        this.setState({ refreshing: false });
        alert(JSON.stringify(response));
      });
  };

  /**
   * Get all sales reps
   *
   * @memberof CampaignTabScreen
   */
  refreshSalesReps = () => {
    this.setState({ refreshing: true });
    firebase
      .functions()
      .httpsCallable("getAll")({
        collection: "sales-reps",
      })
      .then((response) => {
        let data = response.data.data;
        data.forEach((element) => {
          if (!("campaigns" in element)) {
            element.campaigns = [];
          }
          element.campaigns.forEach((element) => {
            if (!("doctors" in element)) {
              elemeent["doctors"] = {};
            }
          });
        });
        this.setState({ salesReps: data });
        this.setState({ refreshing: false });
      })
      .catch((response) => {
        this.setState({ refreshing: false });
        alert(response);
      });
  };

  componentDidMount() {
    this.refreshDoctors();
    this.refreshSalesReps();
  }

  findItemWithUID = (arr, uid) => {
    var i = this.findIndexItemWithUID(arr, uid);
    return arr[i];
  };

  findIndexItemWithUID = (arr, uid) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].uid == uid) {
        return i;
      }
    }
    return -1;
  };

  SalesRepItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor:
            this.state.repCheck === item.uid ? colors.grey : "transparent",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            if (this.state.repCheck === item.uid) {
              this.setState({ repCheck: "", campaignCheck: -1 });
            } else {
              this.setState({ repCheck: item.uid, campaignCheck: -1 });
            }
          }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  NewCampaignItem = () => {
    if (this.state.repCheck != "") {
      let data = this.state.salesReps;
      let id = this.findIndexItemWithUID(data, this.state.repCheck);
      let new_id = 0;
      if (data[id].campaigns.length > 0) {
        new_id = data[id].campaigns[data[id].campaigns.length - 1].id + 1;
        data[id].campaigns.push({
          id: new_id,
          name: "New Campaign",
          doctors: {},
        });
      } else {
        data[id].campaigns.push({
          id: 0,
          name: "New Campaign",
          doctors: {},
        });
      }
      data[id].activeCampaign = new_id;

      this.setState({ data: data });
      this.setState({ campaignCheck: new_id });
    }
  };

  CampaignItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems: "center",
          backgroundColor:
            this.state.campaignCheck === item.id ? colors.grey : "transparent",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            this.setState({ campaignCheck: item.id });
          }}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <Icon
          color={colors.blue}
          name={
            this.state.repCheck != ""
              ? this.findItemWithUID(this.state.salesReps, this.state.repCheck)
                  .activeCampaign == item.id
                ? "check"
                : ""
              : ""
          }
        />
      </View>
    );
  };

  IsDoctorChecked = (uid) => {
    let currentRep = this.findItemWithUID(
      this.state.salesReps,
      this.state.repCheck
    );

    let campaign = currentRep.campaigns[this.state.campaignCheck];
    if (uid in campaign.doctors) {
      return campaign.doctors[uid];
    } else {
      return false;
    }
  };

  ToggleDoctorChecked = (uid) => {
    let data = this.state.salesReps;
    let index = this.findIndexItemWithUID(
      this.state.salesReps,
      this.state.repCheck
    );
    if (uid in data[index].campaigns[this.state.campaignCheck].doctors) {
      data[index].campaigns[this.state.campaignCheck].doctors[uid] = !data[
        index
      ].campaigns[this.state.campaignCheck].doctors[uid];
      this.setState({ salesReps: data });
    } else {
      data[index].campaigns[this.state.campaignCheck].doctors[uid] = true;
      this.setState({ salesReps: data });
    }
  };

  DoctorItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CheckBox
          checked={this.IsDoctorChecked(item.uid)}
          checkedIcon="check-circle-o"
          uncheckedIcon="circle-o"
          onPress={() => this.ToggleDoctorChecked(item.uid)}
        />
        <Text>Dr. {item.name}</Text>
      </View>
    );
  };

  ChooseSalesRepContainer = () => {
    return (
      <View style={styles.subContainer}>
        <Text style={styles.title}>Choose a Sales Rep</Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={this.state.salesReps}
          renderItem={this.SalesRepItem}
          keyExtractor={(item) => item.uid}
        />
      </View>
    );
  };

  ChooseCampaignContainer = () => {
    return (
      <View style={styles.subContainer}>
        <Text style={styles.title}>Campaigns</Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={
            this.state.repCheck != ""
              ? this.findItemWithUID(this.state.salesReps, this.state.repCheck)
                  .campaigns
              : []
          }
          renderItem={this.CampaignItem}
          keyExtractor={(item) => item.uid}
        />
        <Button
          title="New Campaign"
          uppercase={true}
          callback={() => this.NewCampaignItem()}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    );
  };

  CurrentCampaignIndex = () => {
    let campaigns = this.findItemWithUID(
      this.state.salesReps,
      this.state.repCheck
    ).campaigns;
    for (var i = 0; i < campaigns.length; i++) {
      if (campaigns[i].id == this.state.campaignCheck) {
        return i;
      }
    }
    return -1;
  };

  DeleteCampaignItem = () => {
    // On delete, update IDs so that refresh works properly
    let data = this.state.salesReps;
    let index = this.findIndexItemWithUID(
      this.state.salesReps,
      this.state.repCheck
    );
    let cIndex = this.CurrentCampaignIndex();
    data[index].campaigns.splice(cIndex, 1);
    if (data[index].activeCampaign == this.state.campaignCheck) {
      data[index].activeCampaign = 0;
    }
    this.setState({ campaignCheck: 0, salesReps: data });
  };

  ChooseDoctorContainer = () => {
    return (
      <View style={styles.subContainer}>
        <Text style={styles.title}>Campaign Details</Text>
        <TextInput
          style={{
            margin: 20,
            padding: 10,
            backgroundColor: colors.grey,
            borderRadius: 10,
          }}
          placeholder="Name"
          value={
            this.state.repCheck != "" && this.state.campaignCheck != -1
              ? this.findItemWithUID(this.state.salesReps, this.state.repCheck)
                  .campaigns[this.state.campaignCheck].name
              : ""
          }
          onChangeText={(text) => {
            if (this.state.repCheck != "" && this.state.campaignCheck != -1) {
              let data = this.state.salesReps;
              let index = this.findIndexItemWithUID(data, this.state.repCheck);
              data[index].campaigns[this.state.campaignCheck].name = text;
              this.setState({ salesReps: data });
            }
          }}
        />
        <CheckBox
          title="Active"
          checked={
            this.state.repCheck != "" && this.state.campaignCheck != -1
              ? this.state.campaignCheck ==
                this.findItemWithUID(this.state.salesReps, this.state.repCheck)
                  .activeCampaign
              : false
          }
          checkedIcon="check-circle-o"
          uncheckedIcon="circle-o"
          onPress={() => {
            let data = this.state.salesReps;
            let index = this.findIndexItemWithUID(
              this.state.salesReps,
              this.state.repCheck
            );
            data[index].activeCampaign = this.state.campaignCheck;

            this.setState({ salesReps: data });
          }}
        />
        <Text style={styles.title}>Choose Doctors</Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={
            this.state.campaignCheck != -1 && this.state.repCheck != ""
              ? this.state.doctors
              : []
          }
          renderItem={this.DoctorItem}
          keyExtractor={(item) => item.uid}
        />
        <Button
          title="Delete"
          uppercase={true}
          callback={() => this.DeleteCampaignItem()}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          disabled={
            this.state.repCheck != ""
              ? this.findItemWithUID(this.state.salesReps, this.state.repCheck)
                  .campaigns.length == 1
              : false
          }
        />
      </View>
    );
  };

  Submit = () => {
    this.setState({ enabled: false });
    firebase
      .functions()
      .httpsCallable("updateAllSalesReps")({
        data: this.state.salesReps,
      })
      .then((response) => {
        this.setState({ enabled: true });
      })
      .catch((err) => {
        this.setState({ enabled: true });
      });
  };

  MenuButton = () => {
    return this.state.enabled ? (
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => this.Submit()}
      >
        <Icon name="check" type="feather" color={colors.blue} />
      </TouchableOpacity>
    ) : (
      <ActivityIndicator
        style={{ paddingHorizontal: 20 }}
        size="small"
        color={colors.blue}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuHeaderComponent
          name="Campaign Manager"
          nav={this.props.navigation}
          rightButton={this.MenuButton}
        />
        <View style={styles.viewContainer}>
          {this.ChooseSalesRepContainer()}
          {this.state.repCheck == "" || this.ChooseCampaignContainer()}
          {this.state.campaignCheck == -1 || this.ChooseDoctorContainer()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    padding: "5%",
    justifyContent: "space-evenly",
  },
  subContainer: {
    width: "30%",
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 15,
  },
  title: {
    padding: 15,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    backgroundColor: material.Orange["600"].color,
  },
  button: {
    right: 0,
    alignItems: "center",
    marginHorizontal: "2%",
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.blue,
  },
});
export default CampaignTabScreen;
