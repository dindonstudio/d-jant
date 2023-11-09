import React from 'react';

function FilledButton(props) {
  const { text, onClick } = props;

  return (
    <h3 className='myButton filled flex relative cursor-pointer' onClick={onClick}>
  
    {text}
    <div className='  arrow absolute right-0 opacity-0 '>
    <svg className='w-12 h-16' xmlns="http://www.w3.org/2000/svg" fill='#f4f4f4' width="23" height="23" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>

    </div>

  </h3>
  );
}

export default FilledButton;
