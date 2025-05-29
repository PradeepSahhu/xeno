const styles = {
  queryBuilder: "space-y-8 font-sans text-gray-900 max-w-full",

  ruleGroup: `
    bg-gradient-to-br from-white to-gray-50/30 
    p-6 rounded-2xl shadow-lg border border-gray-200/60 
    space-y-5 backdrop-blur-sm
    hover:shadow-xl hover:border-gray-300/60 
    transition-all duration-300 ease-out
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-blue-50/20 before:to-purple-50/20 before:opacity-0 
    hover:before:opacity-100 before:transition-opacity before:duration-500
  `,

  rule: `
    flex flex-wrap items-center gap-4 p-4 
    bg-white/80 rounded-xl border border-gray-100 
    shadow-sm hover:shadow-md hover:bg-white 
    transition-all duration-200 ease-out
    backdrop-blur-sm
  `,

  fields: `
    rounded-lg border border-gray-300/70 bg-white/90 
    shadow-sm px-4 py-2.5 text-sm font-medium text-gray-700
    focus:outline-none focus:ring-3 focus:ring-blue-400/40 
    focus:border-blue-400 focus:bg-white
    hover:border-gray-400/70 hover:shadow-md
    transition-all duration-200 ease-out
    min-w-[120px] backdrop-blur-sm
  `,

  operators: `
    rounded-lg border border-gray-300/70 bg-white/90 
    shadow-sm px-4 py-2.5 text-sm font-medium text-gray-700
    focus:outline-none focus:ring-3 focus:ring-purple-400/40 
    focus:border-purple-400 focus:bg-white
    hover:border-gray-400/70 hover:shadow-md
    transition-all duration-200 ease-out
    min-w-[100px] backdrop-blur-sm
  `,

  combinators: `
    rounded-lg border border-gray-300/70 bg-gradient-to-r 
    from-indigo-50 to-blue-50 shadow-sm px-4 py-2.5 
    text-sm font-semibold text-indigo-700
    focus:outline-none focus:ring-3 focus:ring-indigo-400/40 
    focus:border-indigo-400 focus:from-indigo-100 focus:to-blue-100
    hover:border-indigo-300 hover:shadow-md hover:from-indigo-100 hover:to-blue-100
    transition-all duration-200 ease-out
    min-w-[80px] backdrop-blur-sm
  `,

  value: `
    rounded-lg border border-gray-300/70 bg-white/90 
    shadow-sm px-4 py-2.5 text-sm font-medium text-gray-700
    focus:outline-none focus:ring-3 focus:ring-emerald-400/40 
    focus:border-emerald-400 focus:bg-white
    hover:border-gray-400/70 hover:shadow-md
    transition-all duration-200 ease-out
    min-w-[150px] backdrop-blur-sm
    placeholder:text-gray-400
  `,

  addRule: `
    inline-flex items-center gap-1.5 px-3 py-1.5 
    text-xs font-semibold text-emerald-700 
    bg-emerald-50/80 hover:bg-emerald-100 
    border border-emerald-200/60 hover:border-emerald-300
    rounded-lg shadow-sm hover:shadow-md
    transition-all duration-200 ease-out
    hover:text-emerald-800 hover:-translate-y-0.5
    backdrop-blur-sm
  `,

  addGroup: `
    inline-flex items-center gap-1.5 px-3 py-1.5 
    text-xs font-semibold text-blue-700 
    bg-blue-50/80 hover:bg-blue-100 
    border border-blue-200/60 hover:border-blue-300
    rounded-lg shadow-sm hover:shadow-md
    transition-all duration-200 ease-out
    hover:text-blue-800 hover:-translate-y-0.5
    backdrop-blur-sm
  `,

  removeGroup: `
    inline-flex items-center gap-1.5 px-3 py-1.5 
    text-xs font-semibold text-red-700 
    bg-red-50/80 hover:bg-red-100 
    border border-red-200/60 hover:border-red-300
    rounded-lg shadow-sm hover:shadow-md
    transition-all duration-200 ease-out
    hover:text-red-800 hover:-translate-y-0.5
    backdrop-blur-sm
  `,

  removeRule: `
    inline-flex items-center gap-1.5 px-2 py-1 
    text-xs font-medium text-red-600 
    bg-red-50/60 hover:bg-red-100 
    border border-red-200/40 hover:border-red-300
    rounded-md shadow-sm hover:shadow
    transition-all duration-200 ease-out
    hover:text-red-700 hover:-translate-y-0.5
    backdrop-blur-sm
  `,
};

export default styles;
