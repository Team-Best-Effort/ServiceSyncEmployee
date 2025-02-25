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
    date : string
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
    date: string
  } | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStartTime, setNewStart] = useState("");
  const [newEndTime, setNewEnd] = useState("");
  const [clickedDay, setClickedDay] = useState(new Date());
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const curDay = new Date(today);
    curDay.setDate(today.getDate() - today.getDay() + i);
    days.push(curDay);
  }
  const getTimeInHours = (time: string) => {
    const parts = time.split(":");
    if (parts.length !== 2) return NaN;
    return parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear(); 

    let month = date.getMonth() + 1; 
    let day = date.getDate();

    let monthString = month < 10 ? "0" + month : month.toString();
    let dayString = day < 10 ? "0" + day : day.toString();

    return year + "-" + monthString + "-" + dayString;
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
      date: formatDate(clickedDay)
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
          date: newEndTime
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
      <Text style={styles.headerText}>Employee Calendar Employee Calendar - {formatDate(clickedDay)}</Text>
      <ScrollView  horizontal style={styles.weekContainer}   contentContainerStyle={{ alignItems: "center", paddingVertical: 0 }}>
      {days.map((day, index) => {
          const dayStr = formatDate(day);
          const isSelected = dayStr === formatDate(day);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayItem, isSelected && styles.dayItemSelected]}
              onPress={() => setClickedDay(day)}
            >
              <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
              {dayNames[day.getDay()]}
              </Text>
              <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected]}>
                {day.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
        
      </ScrollView>
      <TouchableOpacity 
      onPress={()=> setMeetingForm(true)}
      >
        <Text style={styles.addButton}>Add Meeting</Text>
      </TouchableOpacity>
      {addMeetingForm && (<View style={styles.formContainer}>
          <TextInput
            placeholder="Meeting Title"
            placeholderTextColor="#ccc"
            value={Title}
            onChangeText={setMeetingTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Meeting Location"
            placeholderTextColor="#ccc"
            value={Location}
            onChangeText={setMeetingLocation}
            style={styles.input}
          />

          <TextInput
            placeholder="Start Time (HH:MM)"
            placeholderTextColor="#ccc"
            value={starttime}
            onChangeText={setStartTime}
            style={styles.input}
          />


          <TextInput
            placeholder="End Time (HH:MM)"
            placeholderTextColor="#ccc"
            value={endtime}
            onChangeText={setEndTime}
            style={styles.input}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity onPress={AddMeeting} style={styles.formButton}>
              <Text style={styles.formButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMeetingForm(false)} style={styles.formButton}>
              <Text style={styles.formButtonText}>Cancel</Text>
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

        {meetings.filter((meeting) => meeting.date === formatDate(clickedDay))
          .map((meeting) => (
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
              <Text style={{ color: "white", fontSize: 10 }}>{meeting.title}</Text>
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TextInput
                placeholder="Edit Meeting Title"
                placeholderTextColor="#ccc"
                value={newTitle}
                onChangeText={setNewTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Edit Meeting Location"
                placeholderTextColor="#ccc"
                value={newLocation}
                onChangeText={setNewLocation}
                style={styles.input}
              />
              <TextInput
                placeholder="Edit Start Time (HH:MM)"
                placeholderTextColor="#ccc"
                value={newStartTime}
                onChangeText={setNewStart}
                style={styles.input}
              />
              <TextInput
                placeholder="Edit End Time (HH:MM)"
                placeholderTextColor="#ccc"
                value={newEndTime}
                onChangeText={setNewEnd}
                style={styles.input}
              />
              <View style={styles.formButtons}>
                <TouchableOpacity
                  onPress={() => {
                    EditMeeting();
                    setEditable(false);
                    setEditMeeting(null);
                  }}
                  style={styles.formButton}
                >
                  <Text style={styles.formButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setEditable(false);
                    setEditMeeting(null);
                  }}
                  style={styles.formButton}
                >
                  <Text style={styles.formButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (editMeeting) {
                      DeleteMeeting(editMeeting.id);
                    }
                  }}
                  style={styles.formButton}

                  >
                  <Text style={styles.formButtonText}>Delete</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#2C2C2C",
  },
  weekContainer: {
    maxHeight: 70,
  },
  weekContent: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dayItem: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#3C3C3C",
    alignItems: "center",
  },
  dayItemSelected: {
    backgroundColor: "#4CAF50",
  },
  farDateItem: {
    backgroundColor: "#555",
  },
  dayText: {
    color: "#ccc",
    fontSize: 12,
  },
  dayNumber: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "bold",
  },
  dayTextSelected: {
    color: "white",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    marginHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    textAlign: "center"
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
  formContainer: {
    backgroundColor: "#3C3C3C",
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#2C2C2C",
    color: "white",
    padding: 8,
    marginVertical: 4,
    borderRadius: 5,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  formButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  formButtonText: {
    color: "white",
    fontSize: 16,
  },
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
  timeLabel: {
    color: "#aaa",
    fontSize: 10,
  },
  slotLine: {
    flex: 1,
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#444",
  },
  meetingEvent: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 2,
  },
  scrollContainer: { 
    paddingBottom: 20 
  },
  meetingTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  meetingLocation: {
    color: "white",
    fontSize: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#3C3C3C",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "white",
    marginBottom: 6,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 14,
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
  slotContainer: {
    flex: 1,
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#444",
  },
});

export default EmployeeCalendar;
