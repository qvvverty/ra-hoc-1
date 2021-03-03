import React, { useState } from 'react';

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

function DateTimePretty(DateTimeComponent) {
  const DateTimePrettified = (props) => {
    const date = new Date(props.date.replace(' ', 'T'));
    const now = new Date();
    let displayDate;

    const hourMs = 60 * 60 * 1000;
    const dayMs = 24 * hourMs;

    if (now - date > 30 * dayMs) displayDate = props.date;
    if (now - date > dayMs && now - date < 30 * dayMs) displayDate = `${Math.ceil((now - date) / dayMs)} дней назад`;
    if (now - date < dayMs) displayDate = `${Math.ceil((now - date) / hourMs)} часов назад`;
    if (now - date < hourMs) displayDate = `${Math.ceil((now - date) / 60 * 1000)} минут назад`;

    return <DateTime date={displayDate} />
  }

  return DateTimePrettified;
}

const DateTimePrettified = DateTimePretty(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={props.url}></iframe>
      <DateTimePrettified date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date} key={item.url} />);
}

export default function App() {
  const [list] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2021-03-03 22:22:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2021-03-02 00:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2021-02-12 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
}