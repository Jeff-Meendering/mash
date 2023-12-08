import { useEffect, useRef } from 'react';

interface JitsiMeetProps {
  roomName: string;
}

const JitsiMeet: React.FC<JitsiMeetProps> = ({ roomName }) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadJitsiMeet = () => {
      if (typeof window.JitsiMeetExternalAPI === 'undefined' || !jitsiContainerRef.current) {
        return;
      }

      const domain = 'meet.jit.si';
      const options = {
        roomName,
        width: '100%',
        height: 700,
        parentNode: jitsiContainerRef.current,
      };

      new window.JitsiMeetExternalAPI(domain, options);
    };

    if (typeof window.JitsiMeetExternalAPI === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = loadJitsiMeet;
      document.body.appendChild(script);
    } else {
      loadJitsiMeet();
    }

    return () => {
      // Dispose the Jitsi Meet API when the component unmounts
      if (window.JitsiMeetExternalAPI) {
        window.JitsiMeetExternalAPI.dispose();
      }
    };
  }, [roomName]);

  return <div ref={jitsiContainerRef} style={{ width: '100%', height: '700px' }} />;
};

export default JitsiMeet;
