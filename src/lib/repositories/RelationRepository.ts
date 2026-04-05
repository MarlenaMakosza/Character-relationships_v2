import { Relationship } from '$lib/domain/Relationship';
import { Relationships } from '$lib/domain/Relationships';
import db from '$lib/server/db';
import { relations } from '$lib/server/db/schema/schema';
import { eq } from 'drizzle-orm';

export class RelationRepository {
  public static async getListRelations(): Promise<Relationship[]> {
    return db.select().from(relations).orderBy(relations.id);
  }

  public static async getRelations(): Promise<Relationships> {
    const relationRecords = await db.select().from(relations).orderBy(relations.id);

    return new Relationships(
      relationRecords.map(
        (rel): Relationship => new Relationship(rel.id, rel.idChar1, rel.idChar2, rel.about),
      ),
    );
  }

  public static async getRelationById(relationId: number): Promise<Relationship> {
    const relationRecord = await db.query.relations.findFirst({
      where: eq(relations.id, relationId),
    });
    if (relationRecord == null) {
      throw new Error('Relation not found');
    }

    return relationRecord;
  }
}

// export default RelationRepository;
