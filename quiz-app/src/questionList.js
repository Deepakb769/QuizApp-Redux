const user = [
    {name : 'Javascript', duration : '3 month'},
    {name : 'ReactJS', duration : '2 month'}
]

localStorage.setItem(
    'userData', JSON.stringify(user)
)