type TabProps = {
    id: string;
    handleClick: () => void;
    activeTab: string;
    icon: string;
    name: string;
}

export const Tab = (props):TabProps => {
    const {id, handleClick,activeTab,name,icon} = props;
    return <button
         key= {id}
         onClick={handleClick}
         className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
             activeTab === id
                 ? 'bg-blue-500 text-white shadow-md'
                 : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
         }`}
     >
         <span className="mr-2 text-lg">{icon}</span>
         {name}
     </button>
 }
