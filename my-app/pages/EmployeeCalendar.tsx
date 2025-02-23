import React, {useState} from "react";
import { SafeAreaView, ScrollView, Alert ,View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";


interface EmployeeCalendarProps {
  navigation: any;
}
const EmployeeCalendar: React.FC<EmployeeCalendarProps> = ({ navigation }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [meetings, setMeetings] = useState<{ 
    id: string; 
    title: string; 
    location: string; 
    start: string; 
    end: string; 
  }[]>([]);  

  const [addMeetingForm, setMeetingForm] = useState(false);
  const [Title, setMeetingTitle] = useState("");
  const [Location, setMeetingLocation] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");

  const [editable, setEditable] = useState(false);
  const [editMeeting, setEditMeeting] = useState<{
    id: string; 
    title: string; 
    location: string; 
    start: string; 
    end: string; 
  } | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStartTime, setNewStart] = useState("");
  const [newEndTime, setNewEnd] = useState("");

  const getTimeInHours = (time: string) => {
    const parts = time.split(":");
    if (parts.length !== 2) return NaN;
    return parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
  };

  const AddMeeting = () => {
    const start = getTimeInHours(starttime);
    const end = getTimeInHours(endtime);
    if (isNaN(start) || isNaN(end) || start >= end) {
      Alert.alert("Time entry Error", "Start/End times are invalid.");
      return;
    }
    if (!Title) {
      Alert.alert("Meeting title Error", "Enter a title for the meetings");
      return;
    }
    const newMeeting = {
      id: Date.now().toString(),
      title: Title,
      location: Location,
      start: starttime,
      end: endtime,
    };
    setMeetings([...meetings, newMeeting]);
    setMeetingTitle("");
    setMeetingLocation("");
    setStartTime("");
    setEndTime("");
    setMeetingForm(false);
  };

  const EditMeeting = () => {
    const start = getTimeInHours(newStartTime);
    const end = getTimeInHours(newEndTime);
  
    if (isNaN(start) || isNaN(end) || start >= end) {
      Alert.alert("Time entry Error", "Start/End times are invalid.");
      return;
    }
  
    if (!newTitle) {
      Alert.alert("Meeting title Error", "Enter a title for the meeting");
      return;
    }
  
    const updatedMeetings = [];
    
    for (let i = 0; i < meetings.length; i++) {
      const meeting = meetings[i];
  
      if (meeting.id === (editMeeting ? editMeeting.id : null)) {
        const updatedMeeting = {
          id: meeting.id,
          title: newTitle,
          location: newLocation,
          start: newStartTime,
          end: newEndTime,
        };
        updatedMeetings.push(updatedMeeting);
      } else {
        updatedMeetings.push(meeting);
      }
    }
    setMeetings(updatedMeetings);
  };

  const DeleteMeeting = (id: string) => {
    let updatedMeetings = [];
    for (let i = 0; i < meetings.length; i++) {
      let meeting = meetings[i];
      if (meeting.id !== id) {
        updatedMeetings.push(meeting);
      }
    }    
    setMeetings(updatedMeetings);
    setEditable(false);
    setEditMeeting(null);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Employee Calendar</Text>
      <TouchableOpacity
      onPress={()=> setMeetingForm(true)}
      >
        <Text>Add Meeting</Text>
      </TouchableOpacity>
      {addMeetingForm && (<View>
        <TextInput
            placeholder="Meeting Title"
            placeholderTextColor="#ccc"
            value={Title}
            onChangeText={setMeetingTitle}
          />
        
        <TextInput
            placeholder="Meeting Location"
            placeholderTextColor="#ccc"
            value={Location}
            onChangeText={setMeetingLocation}
          />

        <TextInput
            placeholder="Start Time (HH:MM)"
            placeholderTextColor="#ccc"
            value={starttime}
            onChangeText={setStartTime}
          />

        
        <TextInput
            placeholder="End Time (HH:MM)"
            placeholderTextColor="#ccc"
            value={endtime}
            onChangeText={setEndTime}
          />
        <View>
            <TouchableOpacity onPress={AddMeeting}>
              <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMeetingForm(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        
      </View>)}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hours.map((hour) => (
          <View key={hour} style={styles.timeSlot}>
            <View style={styles.timeLabelContainer}>
              <Text style={styles.timeLabel}>{hour}:00</Text>
            </View>
            <View style={styles.slotContainer} />
          </View>
        ))}

{meetings.map((meeting) => (
  <TouchableOpacity
    key={meeting.id}
    style={{
      position: "absolute",
      top: getTimeInHours(meeting.start) * 25,
      height: (getTimeInHours(meeting.end) - getTimeInHours(meeting.start)) * 25,
      left: 50,
      right: 5,
      backgroundColor: "#4CAF50",
      borderRadius: 5,
      padding: 4,
    }}
    onPress={() => {
      setEditMeeting(meeting);
      setNewTitle(meeting.title);
      setNewLocation(meeting.location);
      setNewStart(meeting.start);
      setNewEnd(meeting.end);
      setEditable(true);
    }}
  >
    <Text style={{ color: "white", fontSize: 10 }}>
      {meeting.title}
    </Text>
  </TouchableOpacity>
))}
      </ScrollView>
      {editMeeting && (
        <Modal
        visible={editable}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setEditable(false);
          setEditMeeting(null);
        }}
      >
        <View>
            <View>
              <TextInput
                placeholder="Edit Meeting Title"
                placeholderTextColor="#ccc"
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <TextInput
                placeholder="Edit Meeting Location"
                placeholderTextColor="#ccc"
                value={newLocation}
                onChangeText={setNewLocation}
              />
              <TextInput
                placeholder="Edit Start Time (HH:MM)"
                placeholderTextColor="#ccc"
                value={newStartTime}
                onChangeText={setNewStart}
              />
              <TextInput
                placeholder="Edit End Time (HH:MM)"
                placeholderTextColor="#ccc"
                value={newEndTime}
                onChangeText={setNewEnd}
              />
              <View >
              <TouchableOpacity
                onPress={() => {
                  EditMeeting();
                  setEditable(false);
                  setEditMeeting(null);
                }}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditable(false);
                    setEditMeeting(null);
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (editMeeting) {
                      DeleteMeeting(editMeeting.id);
                    }
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
                
              </View>
              </View>
              </View>
      </Modal>
      )}
    <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("EmployeeHome")}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("EmployeeWorksiteInformation")}>
          <Text style={styles.navIcon}>💼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("EmployeeCalendar")}>
          <Text style={styles.navIcon}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("EmployeeInfo")}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2C2C2C" },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 60,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    backgroundColor: "#1C1C1C",
    paddingVertical: 20,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 24,
    color: "white",
  },
  scrollContainer: { paddingBottom: 20 },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  timeLabelContainer: {
    width: 40,
    alignItems: "flex-end",
    paddingRight: 4,
  },
  timeLabel: { color: "#aaa", fontSize: 10 },
  slotContainer: {
    flex: 1,
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#444",
  },
});

export default EmployeeCalendar;
