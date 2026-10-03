import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

const students = [
  { id: "1", name: "Bhuvan M S", course: "MCA", present: true },
  { id: "2", name: "Rahul Kumar", course: "MCA", present: true },
  { id: "3", name: "Anjali Sharma", course: "BCA", present: false },
  { id: "4", name: "Arjun Kumar", course: "BCA", present: true },
  { id: "5", name: "Sneha R", course: "MCA", present: false },
];

export default function HomeScreen() {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);

  const [attendance, setAttendance] = useState(
    students.reduce(
      (data, student) => {
        data[student.id] = student.present;
        return data;
      },
      {} as Record<string, boolean>,
    ),
  );

  const toggleAttendance = (id: string) => {
    setAttendance({
      ...attendance,
      [id]: !attendance[id],
    });
  };

  const filteredStudents = students.filter((student) => {
    const courseMatch =
      selectedCourse === "All" || student.course === selectedCourse;

    const searchMatch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return courseMatch && searchMatch;
  });

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const totalCount = students.length;
  const attendancePercentage = Math.round((presentCount / totalCount) * 100);

  const sections = [
    {
      title: "Present Students",
      data: filteredStudents.filter((student) => attendance[student.id]),
    },
    {
      title: "Absent Students",
      data: filteredStudents.filter((student) => !attendance[student.id]),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Student Attendance</Text>
          <Text style={styles.subtitle}>MCA & BCA Attendance Management</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>Attendance Dashboard</Text>

          <TextInput
            style={styles.input}
            placeholder="Search student..."
            value={search}
            onChangeText={setSearch}
          />

          <Text style={styles.label}>Select Course</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCourse}
              onValueChange={(value) => setSelectedCourse(value)}
            >
              <Picker.Item label="All Courses" value="All" />
              <Picker.Item label="MCA" value="MCA" />
              <Picker.Item label="BCA" value="BCA" />
            </Picker>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Overall Attendance</Text>

            <Text style={styles.percentage}>{attendancePercentage}%</Text>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${attendancePercentage}%` },
                ]}
              />
            </View>

            <Text style={styles.summaryText}>
              {presentCount} Present / {totalCount} Students
            </Text>
          </View>

          <View style={styles.loadingBox}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text>Attendance data loaded</Text>
            )}
          </View>

          <Button
            title="Refresh Attendance"
            onPress={() => {
              setLoading(true);

              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
          />

          <Text style={styles.heading}>Student List</Text>

          <FlatList
            data={filteredStudents}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.studentCard}>
                <View>
                  <Text style={styles.studentName}>{item.name}</Text>

                  <Text style={styles.courseText}>Course: {item.course}</Text>

                  <Text
                    style={[
                      styles.status,
                      attendance[item.id] ? styles.present : styles.absent,
                    ]}
                  >
                    {attendance[item.id] ? "Present" : "Absent"}
                  </Text>
                </View>

                <Switch
                  value={attendance[item.id]}
                  onValueChange={() => toggleAttendance(item.id)}
                />
              </View>
            )}
          />

          <Text style={styles.heading}>Attendance Sections</Text>

          <SectionList
            sections={sections}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.sectionItem}>
                <Text>{item.name}</Text>
                <Text>{item.course}</Text>
              </View>
            )}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Application Features</Text>

            <Text>• React Native View and Text</Text>
            <Text>• State and Props</Text>
            <Text>• Flexbox Layout</Text>
            <Text>• TextInput and Picker</Text>
            <Text>• FlatList and SectionList</Text>
            <Text>• Switch and Button</Text>
            <Text>• ActivityIndicator</Text>
            <Text>• Progress Bar</Text>
          </View>

          <Button
            title="Open WebView"
            onPress={() => setShowWebView(!showWebView)}
          />

          {showWebView && (
            <View style={styles.webViewBox}>
              <Text style={styles.webViewTitle}>WebView Demonstration</Text>

              <Text>
                WebView will be demonstrated here when running the native
                Android/iOS version.
              </Text>
            </View>
          )}

          <View style={styles.positionDemo}>
            <Text style={styles.positionText}>Positioned Element</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },

  header: {
    backgroundColor: "#2563eb",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "white",
    marginTop: 5,
    fontSize: 15,
  },

  content: {
    padding: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },

  pickerContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },

  summaryCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  percentage: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 10,
  },

  progressBackground: {
    height: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22c55e",
  },

  summaryText: {
    marginTop: 10,
  },

  loadingBox: {
    alignItems: "center",
    padding: 15,
  },

  studentCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  studentName: {
    fontSize: 17,
    fontWeight: "bold",
  },

  courseText: {
    marginTop: 4,
    color: "#666",
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },

  present: {
    color: "#16a34a",
  },

  absent: {
    color: "#dc2626",
  },

  sectionHeader: {
    backgroundColor: "#dbeafe",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  sectionItem: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoBox: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
  },

  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  webViewBox: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 15,
    borderRadius: 10,
  },

  webViewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  positionDemo: {
    height: 100,
    width: "100%",
    backgroundColor: "#e0e7ff",
    marginTop: 20,
    position: "relative",
  },

  positionText: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontWeight: "bold",
  },
});
