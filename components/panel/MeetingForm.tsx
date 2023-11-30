import { useTeacher } from "@/hooks/useTeacher";
// import { set } from "date-fns";
import { useSession } from "next-auth/react";
import { DateTimePicker } from "@/components/ui/datetime";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

enum Recurring {
    NEVER = "NEVER",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY",
}

type Appointment = {
    subject: string;
    dateTime: Date;
    location: {
        lat: number;
        lng: number;
        city: string;
        postalCode: string;
        address: string;
    };
    roomNumber: number;
    recurring: Recurring | null;
    teacherId?: number;
    availableSlots: number;
    studentAppointments?: any[];
    occurrences: number;
};

type Props = {
    appointment: Appointment;
    setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
};

export default function MeetingForm({ appointment, setAppointment }: Props) {
    const { data: session } = useSession();
    const { teachers } = useTeacher(false, session?.user.id);
    const teacher = teachers.filter(
        (teacher) => teacher.userId.toString() == session?.user.id
    )[0];

    const getLocationByAddress = (address: string) => {
        return locations.find((location) => location.address == address);
    };

    const locations = [
        {
            lat: 52.2620461,
            lng: 21.0266347,
            city: "Warszawa",
            postalCode: "03-481",
            address: "ul. Szanajcy 5",
        },
        {
            lat: 52.2639814,
            lng: 21.0312258,
            city: "Warszawa",
            postalCode: "03-481",
            address: "ul. Szanajcy 17",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-start w-full h-full lg:h-3/4 md:p-3 xl:p-10 gap-3 overflow-y-auto flex-grow">
            <h1 className="text-xl lg:text-2xl">
                Wybierz przedmiot, datę i lokalizację
            </h1>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Przedmiot
                </label>
                <Select
                    onValueChange={(value) => {
                        setAppointment({
                            ...appointment,
                            subject: value,
                            teacherId: teacher?.userId,
                        });
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Wybierz przedmiot" />
                    </SelectTrigger>
                    <SelectContent>
                        {teacher?.subjects?.map((subject) => (
                            <SelectItem key={subject.id} value={subject.name}>
                                {subject.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="dateAndTime"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Data i godzina
                </label>
                <DateTimePicker
                    date={appointment.dateTime}
                    setDate={(date) => {
                        setAppointment({
                            ...appointment,
                            dateTime: date,
                        });
                    }}
                />
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="recurring"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Powtarzalność
                </label>
                <Select
                    onValueChange={(value) => {
                        setAppointment({
                            ...appointment,
                            recurring: value as Recurring,
                        });
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Wybierz powtarzalność" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Recurring.NEVER}>Nigdy</SelectItem>
                        <SelectItem value={Recurring.WEEKLY}>
                            Co tydzień
                        </SelectItem>
                        <SelectItem value={Recurring.BIWEEKLY}>
                            Co dwa tygodnie
                        </SelectItem>
                        <SelectItem value={Recurring.MONTHLY}>
                            Co miesiąc
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="occurrences"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Ilość powtórzeń
                </label>
                <Input
                    type="number"
                    name="occurrences"
                    id="occurrences"
                    placeholder="Podaj ilość powtórzeń"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            occurrences: parseInt(e.target.value),
                        });
                    }}
                />
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Lokalizacja
                </label>
                <Select
                    onValueChange={(value) => {
                        setAppointment({
                            ...appointment,
                            location: getLocationByAddress(value)!,
                        });
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Wybierz lokalizację" />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location) => (
                            <SelectItem
                                key={location.address}
                                value={location.address}
                            >
                                {location.address}, {location.postalCode}{" "}
                                {location.city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="room"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Numer sali
                </label>
                <Input
                    type="number"
                    name="room"
                    id="room"
                    placeholder="Podaj numer sali"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            roomNumber: parseInt(e.target.value),
                        });
                    }}
                />
            </div>
            <div className="md:w-1/3 w-full">
                <label
                    htmlFor="room"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Ilość dostępnych miejsc
                </label>
                <Input
                    type="number"
                    name="slots"
                    id="slots"
                    placeholder="Podaj ilość dostępnych miejsc"
                    required
                    onChange={(e) => {
                        setAppointment({
                            ...appointment,
                            availableSlots: parseInt(e.target.value),
                        });
                    }}
                />
            </div>
        </div>
    );
}
