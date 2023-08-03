import { dbService, storageService } from 'fbase';
import { useEffect, useRef, useState } from 'react';
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    dbService.collection('nweets')
      .orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
      }));
      setNweets(newArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = '';

    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);

      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();

      // 제출이 완료되고나서도 첨부파일 정보를 정리해주자!
      // 도움이 되었던 글: https://stackoverflow.com/a/70390197
      onClearAttachment();
    }


    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    });
    setNweet('');
    setAttachment('');

  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value }
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    ref.current.value = '';
    setAttachment('');
  };

  const ref = useRef();


  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='file' accept='image/*' ref={ref} onChange={onFileChange} />
        <input type='submit' value='Nweet' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );

};

export default Home;