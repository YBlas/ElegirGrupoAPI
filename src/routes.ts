import { Router } from "express";
import { getDb } from "./mongo";
import { ObjectId } from "mongodb";

const router = Router();
const coleccion = async () =>
  (await getDb()).collection<{
    name: string;
    subject: string;
    students: string[];
  }>("GruposPracticas");

router.get("/", async (req, res) => {
  try {
    const grupos = await (await coleccion()).find().toArray();
    res.json({
      grupos,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const idDelParametro = req.params.id;
  if (idDelParametro.length == 24) {
    const grupo = await (
      await coleccion()
    ).findOne({
      _id: new ObjectId(idDelParametro),
    });
    grupo
      ? res.json(grupo)
      : res.status(404).json({ message: "Persona con dicho id no existe" });
  } else {
    res
      .status(404)
      .json({ message: "Id de diferente longitud a 24 caracteres" });
  }
});

router.post(`/`, async (req, res) => {
  try {
    const groupName = req.body?.groupName;
    const subject = req.body?.subject;
    if (
      groupName &&
      subject &&
      typeof groupName === "string" &&
      typeof subject === "string"
    ) {
      const result = await (
        await coleccion()
      ).insertOne({
        name: groupName,
        subject: subject,
        students: [],
      });
      const idMongo = result.insertedId;
      const grupoCreado = await (await coleccion()).findOne({ _id: idMongo });
      res.status(201).json(grupoCreado);
    } else {
      res.status(400).json({ message: "Invalid input body" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = req.body?.student;
    if (
      student &&
      typeof student === "string"
    ) {
      const result = await (
        await coleccion()
      ).updateOne(
        { _id: new ObjectId(req.params?.id) },
        { $push: { students: student } },
      );
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: "Invalid input body" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await (
      await coleccion()
    ).deleteOne({
      _id: new ObjectId(req.params?.id),
    });
    res.json({ result });
  } catch (err) {
    res.status(404).json(err);
  }
});


export default router;