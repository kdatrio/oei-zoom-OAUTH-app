import { useState } from "react";

function Form({ OnStartMeeting, OnJoinMeeting })  {
    const [meetingSettings, setMeetingSettings] = useState({});

    return <div>return (
        <div>
            <form>
                <label>
                    Meeting Id:
                <input type="text" name="meetingId" required onChange={handleChange} />
                </label>
                <label>
                    Meeting Passcode:
                <input type="text" name="meetingPasscode" required onChange={handleChange} />
                </label>
                <label>
                    User Name:
                <input type="text" name="username" required onChange={handleChange} />
                </label>
                <input type="submit" id="btnStart" value="Start Session" onClick={handleSubmit} />
                <input type="submit" id="btnJoin" value="Join Session" onClick={handleSubmit} />
            </form>
            </div>
        );
    </div>;
}

const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMeetingSettings({ ...meetingSettings, [name]: value });
};

const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.id === "btnStart") OnStartMeeting(meetingSettings);
    if (event.target.id === "btnJoin") OnJoinMeeting(meetingSettings);
    
};


export default Form;
