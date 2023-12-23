/* eslint-disable react/prop-types */

export const QueryContact = ({ query ,OnQueryPhone}) => {
    
  return (
    <div>
        filter show with <input value={query} onChange={OnQueryPhone} />
      </div>
  )
}
