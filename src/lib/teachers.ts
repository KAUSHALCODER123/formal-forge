export type Teacher = {
  id: string;
  name: string;
  employeeId?: string;
  designation?: string;
  basicPay?: number;
  hra?: number;
  allowances?: number;
  deductions?: number;
};

const STORAGE_KEY = "teachers:v1";

function read(): Teacher[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Teacher[]) : [];
  } catch {
    return [];
  }
}

function write(list: Teacher[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listTeachers(): Teacher[] {
  return read();
}

export function getTeacher(id: string): Teacher | undefined {
  return read().find((t) => t.id === id);
}

export function saveTeacher(input: Omit<Teacher, "id"> & { id?: string }): Teacher {
  const list = read();
  const id = input.id || (typeof crypto !== "undefined" && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `${Date.now()}`);
  const existingIdx = list.findIndex((t) => t.id === id);
  const record: Teacher = { id, ...input } as Teacher;
  if (existingIdx >= 0) list[existingIdx] = record; else list.push(record);
  write(list);
  return record;
}

export function deleteTeacher(id: string) {
  write(read().filter((t) => t.id !== id));
}
