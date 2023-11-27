type Props = {
    studentAppointments?: any[];
    teacherAppointments?: any[];
};

export default function PersonalAppointments({
    studentAppointments,
    teacherAppointments,
}: Props) {
    return studentAppointments && studentAppointments.length > 0 ? (
        <StudentAppointments appointments={studentAppointments} />
    ) : teacherAppointments && teacherAppointments.length > 0 ? (
        <TeacherAppointments appointments={teacherAppointments} />
    ) : (
        <div>Brak korepetycji</div>
    );
}

function StudentAppointments({ appointments }: { appointments: any[] }) {
    return <div>StudentAppointments</div>;
}

function TeacherAppointments({ appointments }: { appointments: any[] }) {
    return <div>TeacherAppointments</div>;
}
