import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nweet from '../components/Nweet';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [myNweets, setMyNweets] = useState([]);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyNweets = async () => {
    const nweet = await dbService.collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const dbMyNweets = nweet.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setMyNweets(dbMyNweets);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <div>
      <div>
        {myNweets.map((nweet) => {
          return (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;