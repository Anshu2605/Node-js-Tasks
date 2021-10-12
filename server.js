const mongoose = require('mongoose');
//connect to mongodb
const dbURI = 'mongodb+srv://anshu26:ganesham2605@cluster0.vsw4z.mongodb.net/project?retryWrites=true&w=majority';

mongoose.connect(dbURI , { useNewUrlParser : true , useUnifiedTopology : true })
 .then((result) => app.listen(8000))
 .catch((err) => console.log('err' , err));