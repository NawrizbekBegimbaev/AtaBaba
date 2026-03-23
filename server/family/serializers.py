from rest_framework import serializers
from .models import FamilyMember


class FamilyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyMember
        fields = [
            'id', 'name_kk', 'name_ru', 'gender', 'birth_year', 'death_year',
            'photo', 'description', 'description_ru', 'parent', 'generation', 'order',
        ]


class FamilyMemberTreeSerializer(serializers.ModelSerializer):
    """Recursive serializer that builds the tree structure."""
    children = serializers.SerializerMethodField()

    class Meta:
        model = FamilyMember
        fields = [
            'id', 'name_kk', 'name_ru', 'gender', 'birth_year', 'death_year',
            'photo', 'description', 'description_ru', 'generation', 'children',
        ]

    def get_children(self, obj):
        children = obj.children.all()
        return FamilyMemberTreeSerializer(children, many=True, context=self.context).data
