

const express=require('express');
const {connectToDb,getDb}=require('./db');

const app=express();

app.use(express.json())

/* 
app.listen (3000, ()=>{
    console.log('Uygulama 3000. portta çalışıyor');
})

app.get('/api',(req,res) =>{
    res.json({mesaj: 'Kitap API'})
})
*/
let db;
connectToDb ((err)=>{
    if(!err) {
        app.listen (3000, () => {
              console.log('Uygulama 3000. portta çalışıyor');
        })
        db=getDb()
    }
})

app.get('/api', (req,res)=>{
    let kitaplar=[];

    const sayfa=req.query.s || 0

    const sayfaVeriAdet=3;

    db.collection('kitaplar')
        .find()
        .skip(sayfa*sayfaVeriAdet)
        .limit(sayfaVeriAdet)
        .forEach(kitap=>kitaplar.push(kitap))
        .then(()=>{
            res.status(200).json(kitaplar)
        })
        .catch(()=>{
            res.status (500).json({hata: 'Verilere erişilemedi'})
        })
    })


    app.post('/api', (req,res)=>{
        const kitap=req.body;

        db.collection('kitaplar')
              .insertOne(kitap)
              .then(sonuc=>{
                  res.status (201).json(sonuc)
            })
              .catch(err=>{
                  res.status(500).json({hata: 'Veri eklenemedi'})
            })
    })

    app.delete('/api/:id',(req,res)=>{

        if(objectId.isValid (req.params.id)){

            db.collection('kitaplar')
                .deleteOne({_id:ObjectId(req.params.id)})
                .then(sonuc=>{
                      res.status (200).json(sonuc)
                })
                  .catch(err=>{
                      res.status (500).json({hata: 'Veri silinemedi'})
                })
        }else{
            res.status (500).json({hata: 'ID geçerli değil'})
        }
    })
    
    app.get('/api/:id', (req,res)=>{

            if(objectId.isValid (req.params.id)){
    
                db.collection('kitaplar')
                    .findOne({_id:ObjectId(req.params.id)})
                    .then(sonuc=>{
                          res.status (200).json(sonuc)
                    })
                      .catch(err=>{
                          res.status (500).json({hata: 'Veriye erişilemedi'})
                    })
            }else{
                res.status (500).json({hata: 'ID geçerli değil'})
            }
        })

    app.patch('/api/:id',(req,res)=>{
        const guncellenecekVeri=req.body;

        if(objectId.isValid(req.params.id)){
    
            db.collection('kitaplar')
                .updateOne({_id:ObjectId(req.params.id)},{$set:guncellenecekVeri})
                .then(sonuc=>{
                      res.status(200).json(sonuc)
                })
                  .catch(err=>{
                      res.status (500).json({hata: 'Veriye güncellenemedi'})
                })
        }else{
            res.status (500).json({hata: 'ID geçerli değil'})
        }

        } )
    
app.get('/api',(req,res)=>{

    const sayfa=req.query.s || 0

    const sayfaVeriAdet=3;

    db.collection('kitaplar')
        .find()
        .skip(sayfa*sayfaVeriAdet)
        .limit(sayfa*sayfaVeriAdet)
        .forEach(kitap=>kitaplar.push(kitap))
        .then(()=>{
            res.status(200).json(kitaplar)
        })

})










